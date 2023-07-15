/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package NoCountry.YouTech.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Jimy
 */
@Entity
@Table(name = "broadcast_medium_tag")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "BroadcastMediumTag.findAll", query = "SELECT b FROM BroadcastMediumTag b")
    , @NamedQuery(name = "BroadcastMediumTag.findByIdBroadcastMediumTag", query = "SELECT b FROM BroadcastMediumTag b WHERE b.idBroadcastMediumTag = :idBroadcastMediumTag")})
public class BroadcastMediumTag implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_broadcast_medium_tag")
    private Long idBroadcastMediumTag;
    @JoinColumn(name = "id_broadcast_medium", referencedColumnName = "id_broadcast_medium")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private BroadcastMedium idBroadcastMedium;
    @JoinColumn(name = "id_tag", referencedColumnName = "id_tag")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Tag idTag;

    public BroadcastMediumTag() {
    }

    public BroadcastMediumTag(Long idBroadcastMediumTag) {
        this.idBroadcastMediumTag = idBroadcastMediumTag;
    }

    public Long getIdBroadcastMediumTag() {
        return idBroadcastMediumTag;
    }

    public void setIdBroadcastMediumTag(Long idBroadcastMediumTag) {
        this.idBroadcastMediumTag = idBroadcastMediumTag;
    }

    public BroadcastMedium getIdBroadcastMedium() {
        return idBroadcastMedium;
    }

    public void setIdBroadcastMedium(BroadcastMedium idBroadcastMedium) {
        this.idBroadcastMedium = idBroadcastMedium;
    }

    public Tag getIdTag() {
        return idTag;
    }

    public void setIdTag(Tag idTag) {
        this.idTag = idTag;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idBroadcastMediumTag != null ? idBroadcastMediumTag.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof BroadcastMediumTag)) {
            return false;
        }
        BroadcastMediumTag other = (BroadcastMediumTag) object;
        if ((this.idBroadcastMediumTag == null && other.idBroadcastMediumTag != null) || (this.idBroadcastMediumTag != null && !this.idBroadcastMediumTag.equals(other.idBroadcastMediumTag))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "NoCountry.YouTech.model.BroadcastMediumTag[ idBroadcastMediumTag=" + idBroadcastMediumTag + " ]";
    }
    
}
